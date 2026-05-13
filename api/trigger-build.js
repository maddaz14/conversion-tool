module.exports = async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Received build request:', req.body);
    console.log('Environment variables check:');
    console.log('- GITHUB_TOKEN exists:', !!process.env.GITHUB_TOKEN);
    console.log('- GITHUB_REPO exists:', !!process.env.GITHUB_REPO);
    console.log('- SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
    console.log('- SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);

    const { type, content, packageName, appName, versionCode, versionName } = req.body;

    if (!type || !content) {
      return res.status(400).json({ error: 'type and content are required' });
    }

    // Generate unique ID untuk build
    const buildId = `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Try to use Supabase if configured
    let supabaseInserted = false;
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_ANON_KEY
        );

        const { error } = await supabase
          .from('apk_builds')
          .insert({
            id: buildId,
            type,
            content: content.substring(0, 1000), // Store only first 1000 chars
            package_name: packageName || 'com.example.app',
            app_name: appName || 'My App',
            version_code: versionCode || 1,
            version_name: versionName || '1.0.0',
            status: 'queued',
            created_at: new Date().toISOString()
          });

        if (error) {
          console.error('Supabase error:', error);
        } else {
          supabaseInserted = true;
        }
      } catch (err) {
        console.error('Supabase connection error:', err.message);
      }
    }

    // Try to trigger GitHub Actions
    let githubTriggered = false;
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      try {
        const githubResponse = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}/dispatches`, {
          method: 'POST',
          headers: {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            event_type: 'build-apk',
            client_payload: {
              build_id: buildId,
              type,
              content,
              package_name: packageName || 'com.example.app',
              app_name: appName || 'My App',
              version_code: versionCode || 1,
              version_name: versionName || '1.0.0'
            }
          })
        });

        if (!githubResponse.ok) {
          const errorText = await githubResponse.text();
          console.error('GitHub API error:', githubResponse.status, errorText);
          throw new Error(`GitHub API error: ${githubResponse.status}`);
        }
        githubTriggered = true;
      } catch (err) {
        console.error('GitHub trigger error:', err.message);
      }
    }

    res.status(200).json({
      buildId,
      message: 'Build request received',
      status: 'queued',
      supabaseConfigured: supabaseInserted,
      githubConfigured: githubTriggered,
      debug: {
        supabaseConnected: supabaseInserted,
        githubConnected: githubTriggered
      }
    });

  } catch (error) {
    console.error('Build trigger error:', error);
    res.status(500).json({
      error: 'Failed to trigger build',
      details: error.message
    });
  }
}