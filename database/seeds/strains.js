
exports.seed = function(knex) {
  return knex('strains').del()
    .then(function () {
      return knex('strains').insert([
        { id: 1, strain_name: 'Northern Lights', strain_type: 'Indica', product_type: 'leaf' }
      ]);
    });
};
