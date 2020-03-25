const connection = require('../database/connection');

module.exports = {

  async index(req, res) {
    const { page = 1 } = req.query;

    const [incidents_count] = await connection('incidents').count();

    res.header('X-Total-Count', incidents_count['count(*)']);

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    return res.json(incidents);
  },

  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    res.json({ id });
  },

  async delete(req, res) {

    const incident_id  = req.params.id;
    const ong_id = req.headers.authorization;

    // Selecionar os conteudos que pertencem ao usuário logado,   
    const incident = await connection('incidents')
      .where('id', incident_id)
      .select('ong_id')
      .first();

    if(incident.ong_id != ong_id) {
      return res.status(401).json({ error: 'Operation not permitted. '});
    }
    await connection('incidents').where('id', incident_id).delete();
    
    return res.status(204).send();
  }
}