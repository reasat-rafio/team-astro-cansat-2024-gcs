// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.Ground Control System.pre launch.active:invocation[0]': {
      type: 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Ground Control System.pre launch.ready:invocation[0]': {
      type: 'done.invoke.Ground Control System.pre launch.ready:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Ground Control System.pre launch.stand by:invocation[0]': {
      type: 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.Ground Control System.pre launch.active:invocation[0]': {
      type: 'error.platform.Ground Control System.pre launch.active:invocation[0]';
      data: unknown;
    };
    'error.platform.Ground Control System.pre launch.ready:invocation[0]': {
      type: 'error.platform.Ground Control System.pre launch.ready:invocation[0]';
      data: unknown;
    };
    'error.platform.Ground Control System.pre launch.stand by:invocation[0]': {
      type: 'error.platform.Ground Control System.pre launch.stand by:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    activate: 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
    launch: 'done.invoke.Ground Control System.pre launch.ready:invocation[0]';
    'test readiness': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
  };
  missingImplementations: {
    actions:
      | 'Print the error message'
      | 'Set module to active'
      | 'Set system to active'
      | 'Try again'
      | 'set altitude to 0'
      | 'set clock to 0'
      | 'set pressure to 0'
      | 'set temperature to 0'
      | 'set time to 0';
    delays: never;
    guards:
      | 'can activate'
      | 'cannot activate'
      | 'is not ready'
      | 'is ready'
      | 'velocity < 0 || altitude < 0 || height < 0';
    services: 'activate' | 'launch' | 'test readiness';
  };
  eventsCausingActions: {
    'Print the error message':
      | 'done.invoke.Ground Control System.pre launch.active:invocation[0]'
      | 'done.invoke.Ground Control System.pre launch.ready:invocation[0]'
      | 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
    'Set module to active': 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
    'Set system to active': 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
    'Try again':
      | 'done.invoke.Ground Control System.pre launch.active:invocation[0]'
      | 'done.invoke.Ground Control System.pre launch.ready:invocation[0]'
      | 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
    'set altitude to 0': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
    'set clock to 0': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
    'set pressure to 0': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
    'set temperature to 0': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
    'set time to 0': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    'can activate': 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
    'cannot activate': 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]';
    'is not ready': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
    'is ready': 'done.invoke.Ground Control System.pre launch.active:invocation[0]';
    'velocity < 0 || altitude < 0 || height < 0': 'done.invoke.Ground Control System.pre launch.ready:invocation[0]';
    'velocity > 0 && altitude > 0 && height > 0': 'done.invoke.Ground Control System.pre launch.ready:invocation[0]';
  };
  eventsCausingServices: {
    activate:
      | 'error.platform.Ground Control System.pre launch.stand by:invocation[0]'
      | 'start';
    launch:
      | 'done.invoke.Ground Control System.pre launch.active:invocation[0]'
      | 'error.platform.Ground Control System.pre launch.ready:invocation[0]';
    'test readiness':
      | 'done.invoke.Ground Control System.pre launch.stand by:invocation[0]'
      | 'error.platform.Ground Control System.pre launch.active:invocation[0]';
  };
  matchesStates:
    | 'descent'
    | 'descent.Heat shield deployment'
    | 'idle'
    | 'post launch'
    | 'post launch.ascent'
    | 'pre launch'
    | 'pre launch.active'
    | 'pre launch.ready'
    | 'pre launch.stand by'
    | {
        descent?: 'Heat shield deployment';
        'post launch'?: 'ascent';
        'pre launch'?: 'active' | 'ready' | 'stand by';
      };
  tags: never;
}
