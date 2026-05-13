const { createClient } = require('@supabase/supabase-js');

// Supabase client (gunakan environment variables)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validasi environment variables
    if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
      return res.status(500).json({
        error: 'Server configuration error',
        details: 'GitHub environment variables not configured'
      });
    }

    const { type, content, packageName, appName, versionCode, versionName } = req.body;

    if (!type || !content) {
      return res.status(400).json({ error: 'type and content are required' });
    }

    // Generate unique ID untuk build
    const buildId = `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simpan data build ke Supabase
    const { data, error } = await supabase
      .from('apk_builds')
      .insert({
        id: buildId,
        type,
        content,
        package_name: packageName || 'com.example.app',
        app_name: appName || 'My App',
        version_code: versionCode || 1,
        version_name: versionName || '1.0.0',
        status: 'queued',
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    // Trigger GitHub Actions via repository dispatch
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
      throw new Error(`GitHub API error: ${githubResponse.status} - ${errorText}`);
    }

    res.status(200).json({
      buildId,
      message: 'Build queued successfully',
      status: 'queued'
    });

  } catch (error) {
    console.error('Build trigger error:', error);
    res.status(500).json({
      error: 'Failed to trigger build',
      details: error.message
    });
  }
}