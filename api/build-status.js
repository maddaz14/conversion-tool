const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { buildId } = req.query;

    if (!buildId) {
      return res.status(400).json({ error: 'buildId is required' });
    }

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

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({
      error: 'Failed to check build status',
      details: error.message
    });
  }
}