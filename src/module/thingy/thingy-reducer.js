import {
  RECEIVE_NEW_READING,
  RECEIVE_NEW_NOTIFY_READING,
  FEATURE_NOTIFICATION_STATUS,
  CLEAN_THE_SLATE,
  NOTIFY_USER,
  SET_FEATURE_HAS_EVENT_LISTENER,
} from "module/thingy/thingy-actions";

const thingyState = {
  connected: {
    reading: false,
  },
  temperature: {
    status: false,
    reading: undefined,
  },
  pressure: {
    status: false,
    reading: undefined,
  },
  co2: {
    status: false,
    reading: undefined,
  },
  tvoc: {
    status: false,
    reading: undefined,
  },
  humidity: {
    status: false,
    reading: undefined,
  },
  color: {
    status: false,
    reading: undefined,
  },
  stepcounter: {
    status: false,
    reading: {
      count: 0,
      time: {
        unit: "ms",
        value: 0,
      },
    },
  },
  tap: {
    status: false,
    reading: {
      direction: 0,
      count: 0,
    },
  },
  gravityvector: {
    status: false,
    reading: {
      value: {
        x: 0,
        y: 0,
        z: 0
      }
    },
  },
  heading: {
    status: false,
    reading: {
      heading: 0,
    },
  },
  quaternionorientation: {
    status: false,
    reading: {
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    },
  },
  led: {
    reading: {
      mode: -1,
    },
  },
  button: {
    status: false,
    reading: {
      value: 0,
    },
  },
  firmware: {
    reading: {
      firmware: "",
    },
  },
  name: {
    reading: {
      name: "",
    },
  },
  advertisingparameters: {
    reading: {
      interval: 0,
      timeout: 0,
    },
  },
  connectionparameters: {
    reading: {
      minInterval: 8,
      maxInterval: 4000,
      slaveLatency: 0,
      timeout: 100,
    },
  },
  eddystone: {
    reading: {
      href: "",
    },
  },
  cloudtoken: {
    reading: {
      token: "",
    },
  },
  environmentconfiguration: {
    reading: {
      temperatureInterval: 0,
      pressureInterval: 0,
      humidityInterval: 0,
      colorInterval: 0,
      gasInterval: 1,
      colorSensorCalibration: {
        blue: 0,
        green: 0,
        red: 0,
      },
    },
  },
  motionconfiguration: {
    reading: {
      stepCounterInterval: 0,
      tempCompensationInterval: 0,
      magnetCompInterval: 0,
      motionProcessFrequency: 0,
      wakeOnMotion: 0,
    },
  },
  samples: {
    reading: undefined,
  },
  tones: {
    reading: undefined,
  },
  pcm: {
    reading: {
      playStatus: 0,
    },
  },
  microphone: {
    reading: undefined,
    status: false,
  },
  battery: {
    reading: {
      status: 100,
    },
  },
};

export default (state = thingyState, action) => {
  switch (action.type) {
  case RECEIVE_NEW_READING:
    return {
      ...state,
      [action.reading.feature]: {
        ...state[action.reading.feature],
        reading: action.reading.reading,
      },
    };

  case RECEIVE_NEW_NOTIFY_READING:
    if (action.reading.feature === "gas") {
      return {
        ...state,
        co2: {
          ...state.co2,
          reading: (state.co2.status ? action.reading.reading.detail.eCO2 : state.co2.reading),
        },
        tvoc: {
          ...state.tvoc,
          reading: (state.tvoc.status ? action.reading.reading.detail.TVOC : state.tvoc.reading),
        },
      };
    } else {
      return {
        ...state,
        [action.reading.feature]: {
          ...state[action.reading.feature],
          reading: action.reading.reading.detail,
        },
      };
    }

  case FEATURE_NOTIFICATION_STATUS:
    return {
      ...state,
      [action.status.feature]: {
        ...state[action.status.feature],
        status: action.status.status,
      },
    };

  case CLEAN_THE_SLATE:
    return thingyState;

  case NOTIFY_USER:
    return {
      ...state,
      notification: action.message,
    };

  case SET_FEATURE_HAS_EVENT_LISTENER:
    return {
      ...state,
      [action.feature]: {
        ...state[action.feature],
        hasEventListener: true,
      },
    };

  default:
    return state;
  }
};
