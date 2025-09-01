'use strict';

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.featuredImage && data.featuredImage?.[0]) {
      const file = data.featuredImage[0];
      console.log('🖼️ Featured Image URL (beforeCreate):', file.url);

      data.image_url = file.url;
      console.log('✅ image_url set in article table (beforeCreate):', data.image_url);
    } else {
      console.log('⚠️ No featuredImage found for this article (beforeCreate)');
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.featuredImage && data.featuredImage?.[0]) {
      const file = data.featuredImage[0];
      console.log('🖼️ Featured Image URL (beforeUpdate):', file.url);

      data.image_url = file.url;
      console.log('✅ image_url updated in article table (beforeUpdate):', data.image_url);
    } else {
      console.log('⚠️ No featuredImage found for this article (beforeUpdate)');
    }
  }
};
