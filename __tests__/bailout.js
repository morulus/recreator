import recreator from '../src';

function getActionNameCreator(uniqcode = 'xxx') {
  return actionName => `ACCESS_${uniqcode}_${actionName}`;
}

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
  createActionName: (props) => {
    const {
      constants: {
        UID,
      },
    } = props;
    return getActionNameCreator(UID);
  },
};

const createSelectors = {
  selectLocalResources: () => state => state.resources,
};

function createActionNames({
  helpers: {
    createActionName,
  },
}) {
  return {
    FETCH_RESOURCE_PERMIT: createActionName('ACTION_FETCH_RESOURCE_PERMIT'),
    FETCH_RESOURCE_PERMIT_SUCCESS: createActionName('ACTION_FETCH_RESOURCE_PERMIT_SUCCESS'),
    FETCH_RESOURCE_PERMIT_ERROR: createActionName('ACTION_FETCH_RESOURCE_PERMIT_ERROR'),
  };
}


describe('BAILOUT', () => {
  it('Customizing constants will invokes bailout', () => {
    const factory = recreator({
      constants: createConstants,
      helpers: createHelpers,
      selectors: createSelectors,
      actions: {
        names: createActionNames,
      },
    });

    factory({
      constants: {
        RESOURCE_COMMON_KEY: 'RESOURCE_COMMON_KEY',
        RESOURCE_DEFAULT_OPTIONS_HASH: 'RESOURCE_DEFAULT_OPTIONS_HASH',
      },
    })();
  });
});
