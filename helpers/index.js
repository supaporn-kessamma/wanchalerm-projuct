export const makeSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/\//g, '-')
}

export const makeMeta = (title, description, url, image, type = 'website') => {
  return [
    { hid: 'itemprop-name', itemprop: 'name', content: title },
    {
      hid: 'itemprop-description',
      itemprop: 'description',
      content: description
    },
    {
      hid: 'itemprop-image',
      itemprop: 'image',
      content: image
    },
    { hid: 'title', name: 'TITLE', content: title },
    { hid: 'description', name: 'DESCRIPTION', content: description },
    { hid: 'abstract', name: 'ABSTRACT', content: title },
    { hid: 'keywords', name: 'KEYWORDS', content: title },
    { hid: 'og:title', property: 'og:title', content: title },
    { hid: 'og:url', property: 'og:url', content: url },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description
    },
    { hid: 'og:type', property: 'og:type', content: type },
    { hid: 'og:image', property: 'og:image', content: image },
    { hid: 'twitter:title', name: 'twitter:title', content: title },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    },
    { hid: 'twitter:image', name: 'twitter:image', content: image }
  ]
}
