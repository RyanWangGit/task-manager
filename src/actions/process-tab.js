import kill from 'kill-process';
import { UPDATE_PROCESS_INFO, PROCESS_KILLED } from '../constants/action-types';

export function updateProcessInfo(processInfo, cpuLoad, memLoad) {
  return {
    type: UPDATE_PROCESS_INFO,
    processes: processInfo,
    cpuLoad: cpuLoad,
    memLoad: memLoad
  }
}

export function processKilled(pid) {
  return {
    type: PROCESS_KILLED,
    pid: pid
  }
}

export function killProcess(pid) {
  return async (dispatch) => {
    await kill(pid);
    dispatch(processKilled(pid));
  };
}
