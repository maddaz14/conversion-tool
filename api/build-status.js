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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { buildId } = req.query;

    if (!buildId) {
      return res.status(400).json({ error: 'buildId is required' });
    }

    // If Supabase not configured, return mock data for testing
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return res.status(200).json({
        buildId,
        status: 'building',
        progress: 50,
        error_message: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }

    try {
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
      );

      // Get build status dari Supabase
      const { data, error } = await supabase
        .from('apk_builds')
        .select('*')
        .eq('id', buildId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Build not found' });
        }
        throw error;
      }

      res.status(200).json({
        buildId: data.id,
        status: data.status,
        apk_url: data.apk_url,
        apk_size: data.apk_size,
        error_message: data.error_message,
        created_at: data.created_at,
        updated_at: data.updated_at
      });

    } catch (err) {
      console.error('Supabase error:', err);
      return res.status(200).json({
        buildId,
        status: 'building',
        error_message: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      error: 'Failed to check build status',
      details: error.message
    });
  }
}