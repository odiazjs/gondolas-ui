export let url = 'localhost:8080/api';
url = '138.68.46.162:8080/api';

const config: any = {
    'protocol': 'http',
    'scheme': 'Bearer',
    'api': {
        'baseUrl': `${url}`,
        'apiVersion': 'v1'
    },
    'imgUrl': ``,
    'auth': {
        'version': 'v1',
        'url': `${url}`,
        'signup': 'signup',
        'loginEndpoint': 'auth',
        'logoutEndpoint': 'auth/logout',
        'refreshTokenEndpoint': 'auth/refresh'
    },
    'users': {
        'version': 'v1',
        'url': `${url}`,
        'getAllUsers': 'users'
    },
    'register': {
        'version': 'v1',
        'url': `${url}`,
        'registerNew': 'register'
    },
    'images': {
        'version': 'v1',
        'url': `${url}`,
        'getImages': 'images'
    },
    'business': {
        'version': 'v1',
        'url': `${url}`,
        'getBusiness': 'business'
    },
    'formats': {
        'version': 'v1',
        'url': `${url}`,
        'getFormats': 'formats'
    },
    'chains': {
        'version': 'v1',
        'url': `${url}`,
        'getChains': 'chains'
    },
    'channels': {
        'version': 'v1',
        'url': `${url}`,
        'getChannels': 'channels'
    },
    'brands': {
        'version': 'v1',
        'url': `${url}`,
        'getBrands': 'brands'
    },
    'categories': {
        'version': 'v1',
        'url': `${url}`,
        'getCategories': 'categories'
    },
    'roles': {
        'version': 'v1',
        'url': `${url}`,
        'getRoles': 'roles'
    },
    'devices': {
        'version': 'v1',
        'url': `${url}`,
        'getDevices': 'devices'
    },
    'jobTitles': {
        'version': 'v1',
        'url': `${url}`,
        'getJobTitles': 'job-titles'
    },
    'companies': {
        'version': 'v1',
        'url': `${url}`,
        'getCompanies': 'companies'
    },
    'phoneCompanies': {
        'version': 'v1',
        'url': `${url}`,
        'getPhoneCompanies': 'phone-companies'
    },
    'cities': {
        'version': 'v1',
        'url': `${url}`,
        'getCities': 'cities'
    },
    'states': {
        'version': 'v1',
        'url': `${url}`,
        'getStates': 'states'
    },
    'flavors': {
        'version': 'v1',
        'url': `${url}`,
        'getFlavors': 'flavors'
    },
    'presentations': {
        'version': 'v1',
        'url': `${url}`,
        'getPresentations': 'presentations'
    },
    'products': {
        'version': 'v1',
        'url': `${url}`,
        'getProducts': 'products'
    },
    'gondolas': {
      'version': 'v1',
      'url': `${url}`,
      'getGondolas': 'gondolas'
  }
};

const {
    protocol,
    scheme,
    api: {
        baseUrl,
        apiVersion
    },
    imgUrl,
    auth: { loginEndpoint },
    users: { getAllUsers },
    register: { registerNew },
    images: { getImages },
    business: { getBusiness },
    formats: { getFormats },
    chains: { getChains },
    channels: { getChannels },
    brands: { getBrands },
    categories: { getCategories },
    roles: { getRoles },
    devices: { getDevices },
    jobTitles: { getJobTitles },
    companies: { getCompanies },
    phoneCompanies: { getPhoneCompanies },
    cities: { getCities },
    states: { getStates },
    products: { getProducts },
    presentations: { getPresentations },
    flavors: { getFlavors },
    gondolas: { getGondolas }
} = config;

export const endpointsUrl = {
    scheme,
    imgUrl: `${protocol}://${baseUrl}/${apiVersion}/images/`,
    authUrl: `${protocol}://${baseUrl}/${apiVersion}/${loginEndpoint}`,
    usersUrl: `${protocol}://${baseUrl}/${apiVersion}/${getAllUsers}`,
    registerUrl: `${protocol}://${baseUrl}/${apiVersion}/${registerNew}`,
    imagesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getImages}`,
    businessUrl: `${protocol}://${baseUrl}/${apiVersion}/${getBusiness}`,
    formatsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getFormats}`,
    chainsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getChains}`,
    channelsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getChannels}`,
    brandsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getBrands}`,
    categoriesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getCategories}`,
    rolesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getRoles}`,
    devicesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getDevices}`,
    jobTitlesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getJobTitles}`,
    companiesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getCompanies}`,
    phoneCompaniesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getPhoneCompanies}`,
    citiesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getCities}`,
    statesUrl: `${protocol}://${baseUrl}/${apiVersion}/${getStates}`,
    productsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getProducts}`,
    presentationsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getPresentations}`,
    flavorsUrl: `${protocol}://${baseUrl}/${apiVersion}/${getFlavors}`,
    gondolasUrl: `${protocol}://${baseUrl}/${apiVersion}/${getGondolas}`,
};
