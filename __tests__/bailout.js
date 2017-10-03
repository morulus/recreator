import recreator from '../src';

function createConstants() {
  return {
    RESOURCE_COMMON_KEY: Symbol('RESOURCE_COMMON_KEY'),
    RESOURCE_DEFAULT_OPTIONS_HASH: Symbol('NO_OPTIONS'),
    INITIAL_RESOURCE_STATE: {},
    INITIAL_RESOURCES_STATE: {},
    INIITAL_CONDITIONAL_RESOURCE_STATE: {
      permissions: {},
      pending: 0,
    },
    FETCH_OBJECTS_DELAY: 100,
    UID: 'safafdff=dfd-fdfsdfasf',
    NAME: 'access',
  };
}

const createHelpers = {
  getOptionsHash: ({
    constants: {
      RESOURCE_DEFAULT_OPTIONS_HASH,
    },
  }) => (options) => {
    if (!options) {
      return RESOURCE_DEFAULT_OPTIONS_HASH;
    }
    return JSON.stringify({});
  },
  getApiUrl: () => (suffix = '') => `admin/access/${suffix}`,
  prepareId: () => id => (id ? String(id) : id),
  toFalsePair: () => name => [name, false],
};

describe('BAILOUT', () => {
  it('Customizing constants will invokes bailout', () => {
    const factory = recreator({
      constants: createConstants,
      helpers: createHelpers,
    });

    factory({
      constants: {
        RESOURCE_COMMON_KEY: 'RESOURCE_COMMON_KEY',
        RESOURCE_DEFAULT_OPTIONS_HASH: 'RESOURCE_DEFAULT_OPTIONS_HASH',
      },
    })();
  });
});
