import { createMachine } from 'xstate';

const gcsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHEBOB7ArgOwgAgGF1sAXDAGzwGUBPWEsAWwDoBLCcsAYnoENUSAbQAMAXUSgADulisSrYhJAAPRAEYAbABZmwvcLXCAnMIBMADnNqjWgDQgaiK8y1G3J4QHYArOdMbtAF9A+zQsXEJiMnRKWnomZklUMDxyXhwAYwALZj4IgCMaLghiMDZsADd0AGsysJx8IlIKajoGFiSUtMycvPxChFZK9AzeeWIRUUmlaVlx7CVVBC01T2Y1cx8Lbw3TawD7RwRvT1NmI28AZjVrvxsNz2DQjAbI5pjW+I7k1PTsbNyJF4BSKJWwZSGVVqzHqESa0VibQSnV+PUBwP6NEGw1G80mgjU4iQIFmcgUC2JS02h0QWm8RnO7iM5g0ZmE9MuTxAsMaURacXaiR+3X+vSBIK4YFQGFQiTSJAAZuhUCweW8EZ9BSiRQC+ngBpCRmNyfixDMZGTFJT1D5zqyLpdXOY3GpvBoacs1GdvPpdqZTJ5Lp4tFy1fD+Ujvl0-gDeBl5BVuGCIcNoWG+R8BcjhTGcnGE2BsVVcSaxNNiaT5ot1MIVudhBpTBzfD7THYHIhvFpzMxLm7zGZg3SjD5Qy84RnEV8hdG0fnWIniqVylC6uPee8p1qc3P4wvC4aSxMy4TzXNydWEBojBpdFoNM6vKtg+YPVpbcJzJc+-TA5djK6Y7hBuGpZlGqKisw86LlKMpymMSoqjC67qhG07armUF7omRZGniZZmhWFpVtaCCeIG9aNk22jdm2phvgGzC+N+lyWK4N50t4QGvOGmaRjOEEAskvAQKCy6GmmKG8Vu2azpBwmibhR7YKaRJSMRF6kX6vZaEGpgmJ4RiXAGHoaJcDJePprKXGZzqsdxE6bpqsmCTkClieCK41GuwGoXx6E7vJYAiVih7GseUynkR55WqASw3N+LhXGoXqunswZviY6wBJ41j3uYboWBoDkgWh25yUJwWiZK0rKvBirKqqUmTs54E6m5VWhTi4UqQRakkhpsUqOo3Y9j6egBp4fj+FNb5aGcAQaJ4ZiOt4ex+FxITcs1TlgYkMgkK5XAAKKJqQeBqOW6kxRScWIKY5m6L6xhmJY1ieB6hises-orN4bp6AV5jBFt2DoBAcBKOmu2Rmelq3cNCAALRGB6SPFVt0Ogfx7CcHDJF3cs9EdggzhMrly2sWlwOYzt2MBRVWT45phPmR6xk6OT+l6Y6GPPL50mtQJ7XoiCzNDfFGhqMwU1ejs5kBPpH0k74OhaA2M0Dlc1589tAstXtGG7gW4sI0sPgMqcGgA0V3Y7B69IMt2FxscZ9JLSVfkyW1mHuabl5qO+OjGa9dm+F+aimYHTGnBc1gBgV7Ke4LhsHa5-ukWzJMjsIzCbA9lgBo2wjXMnBv8bMh0i7wsAZGApAZ4T1Ik4Yvi9qcfYjpoN7-WXMPThDtf1yQjeI9+0t0o2jaGV994eiOt5mG2Nz+v9-imH39OCoPdekMwAASwWHbAWSsGA5D4BDkjkOgNCMMPo9LEGTuFdPRiz+6LcNt4ui-YHWjdilr4EGgQgA */
    id: 'Ground Control System',
    initial: 'idle',
    tsTypes: {} as import('./gcs-machine.typegen').Typegen0,
    context: {
      errorMessage: null
    },

    states: {
      idle: {
        on: {
          start: 'pre launch'
        }
      },

      'pre launch': {
        states: {
          'stand by': {
            invoke: {
              src: 'activate',

              onError: {
                target: 'stand by',
                internal: true
              },
              onDone: [
                {
                  target: 'active',
                  cond: 'can activate',
                  actions: ['Set module to active', 'Set system to active']
                },
                {
                  cond: 'cannot activate',
                  actions: ['Print the error message', 'Try again']
                }
              ]
            }
          },

          active: {
            invoke: {
              src: 'test readiness',
              onDone: [
                {
                  target: 'ready',

                  actions: [
                    'set altitude to 0',
                    'set temperature to 0',
                    'set pressure to 0',
                    'set time to 0',
                    'set clock to 0'
                  ],

                  cond: 'is ready'
                },
                {
                  cond: 'is not ready',
                  actions: ['Print the error message', 'Try again']
                }
              ],

              onError: {
                target: 'active',
                internal: true
              }
            }
          },

          ready: {
            invoke: {
              src: 'launch',

              onDone: [
                {
                  target: '#Ground Control System.post launch',
                  cond: 'velocity > 0 && altitude > 0 && height > 0'
                },
                {
                  cond: 'velocity < 0 || altitude < 0 || height < 0',
                  actions: ['Print the error message', 'Try again']
                }
              ],

              onError: {
                target: 'ready',
                internal: true
              }
            }
          }
        },

        initial: 'stand by'
      },

      'post launch': {
        states: {
          ascent: {}
        },

        initial: 'ascent',

        on: {
          'Event 1': 'descent'
        }
      },

      descent: {
        states: {
          'Heat shield deployment': {}
        },

        type: 'final'
      }
    }
  },
  {
    guards: {
      'velocity > 0 && altitude > 0 && height > 0': () => true
    }
  }
);
