/**
 * Call default service... config provides it a set of simple executibles.
 */
const debug = require('debug')('acter:call');

const appData = {
  app: {
    name: 'uProspect', // Name should be all lowercase and URL friendly (no spaces / etc).
    title: 'uProspect',
    subtitle: 'Improve your life!',
    loaded: false
  },
  layout: {
    primary: {
      show: true,
      mini: true
    },
    secondary: {
      show: false,
      mini: false
    }
  },
  menu: {
    items: {
      builder: {
        icon: 'mdi-account-edit',
        inverted: false,
        color: 'secondary',
        title: 'Builder',
        subtitle: 'Build your CV',
        to: '/builder'
      },
      storage: {
        icon: 'contacts',
        inverted: false,
        color: 'secondary',
        title: 'Storage',
        subtitle: 'Your finished CVs',
        to: '/storage'
      },
      analitics: {
        icon: 'mdi-chart-bar',
        inverted: false,
        color: 'secondary',
        title: 'Analytics',
        subtitle: 'Analytics of your shared CVs',
        to: '/analytics'
      },
      profile: {
        icon: 'account_circle',
        inverted: false,
        color: 'primary',
        title: 'Profile',
        subtitle: 'Settings and more',
        to: '/profile'
      },
    },
    shortcuts: [
      {
        icon: 'account_circle',
        inverted: false,
        color: 'primary',
        title: 'Profile',
        description: 'Settings and more',
        action: '/profile'
      },
      {
        icon: 'folder',
        inverted: false,
        color: 'secondary',
        title: 'Messages',
        description: 'Securely store email',
        action: '/message'
      },
      {
        icon: 'folder',
        inverted: false,
        color: 'secondary',
        title: 'Tasks',
        description: 'Take care of daily tasks',
        action: '/task'
      },
      {
        icon: 'folder',
        inverted: false,
        color: 'secondary',
        title: 'Patients',
        description: 'Manage patients you care for',
        action: '/patient'
      },
      {
        icon: 'folder',
        inverted: false,
        color: 'secondary',
        title: 'Conversations',
        description: 'Securely track conversations',
        action: '/conversation'
      }
    ]
  },
  guides: {
    onboard: {
      intro: {
        text: true,
        logo: true,
        image: '/statics/images/onboard/left.png'
      }
    }
  },
  pages: {
    profile: {
      tabs: {
        me: { icon: 'fingerprint', to: 'profile-info', label: 'Me' },
        settings: { icon: 'settings', to: 'profile-settings', label: 'Settings' }
      }
    },
    programs: {
      category: {
        1: { name: 'HEALTH & FITNESS', color: 'pink-6', icon: 'life-age' },
        2: { name: 'FITNESS', color: 'blue-6', icon: 'eat-healthy' },
        3: { name: 'FINANCE', color: 'amber-6', icon: 'retirement' },
        4: { name: 'RISK', color: 'red-6', icon: 'egg-bottom' },
        5: { name: 'RELATIONSHIPS', color: 'purple-6', icon: 'egg-top' }
      },
      difficulty: {
        1: { name: 'Very easy' },
        2: { name: 'Pretty easy' },
        3: { name: 'Easy' },
        4: { name: 'Fun' },
        5: { name: 'Challenging' }
      },
      type: {
        1: { name: 'Article' },
        2: { name: 'Quiz' },
        3: { name: 'Article & Questions' },
        4: { name: 'Choose your own Adventure' },
        5: { name: 'Game' },
        6: { name: 'Video' },
        7: { name: 'Offer' }
      },
      slideTypes: {
        slide: {},
        quiz: {},
        question: {},
        questions: {},
        form: {},
        info: {},
        result: {}
      },
      data: {
        healthFitness: {
          title: '5 steps to improve your life age score',
          category: 1,
          type: 3,
          difficulty: 3,
          points: 150,
          time: '10 Minutes',
          slides: {
            index: {
              title: 'Answer questions to generate your life score and read the article',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`
            },
            start: {
              title: 'Get gready to increase your lifespan!',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`,
              type: 'side'
            },
            howDoYouFeel: {
              title: 'Get gready to increase your lifespan!',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`,
              type: 'question'
            }
          }
        },
        healthFitness2: {
          title: '5 more steps to improve your life age score',
          category: 1,
          type: 1,
          difficulty: 4,
          points: 70,
          time: '10 Minutes',
          slides: {
            index: {
              title: 'Answer questions to generate your life score and read the article',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`
            },
            start: {
              title: 'Here we go!',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`,
              type: 'side'
            },
            howDoYouFeel: {
              title: 'Get gready to increase your lifespan!',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`,
              type: 'question'
            }
          }
        },
        healthFitness3: {
          title: 'Yet another 5 steps to improve your life age score',
          category: 2,
          type: 2,
          difficulty: 2,
          points: 150,
          time: '10 Minutes',
          slides: {
            index: {
              title: 'Answer questions to generate your life score and read the article',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`
            },
            start: {
              title: 'Lets do this!',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`,
              type: 'side'
            },
            howDoYouFeel: {
              title: 'Get gready to increase your lifespan!',
              body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.`,
              type: 'question'
            }
          }
        }
      }
    },
    tasks: {

    }
  }
};

var loginObject = {};

module.exports = function ( config ) {
  return {
    async get (payload, params) {
      let rpc = params.route.__id;
      debug(`${rpc}(${payload})`);
      console.log(`Called ${rpc}(`, payload, ')', params);
      let id = 0;
      let result = {};

      switch (rpc) {
      case 'update':
        id = params.connection.user.id;
        result = await this.app.service('users').find({query: {id}});
        result.settings = JSON.stringify(payload.settings);
        result.password = '123';
        await this.app.service('users').patch(1, {settings: result.settings});
        return true;
      case 'hydrate':
        // let data = await this.app.service('users').find({query: {id: 1}});
        // loginObject.identity = data.data[0];
        loginObject.app = appData;
        // console.log('returned', data)
        return loginObject;
      }
    },
    find (params, next) {
      next(null, this.records);
    },
    create (data, params, next) {
      this.records.push(data);
      next(null, data);
    },
    setup (app) {
      this.app = app
    }
  };
};