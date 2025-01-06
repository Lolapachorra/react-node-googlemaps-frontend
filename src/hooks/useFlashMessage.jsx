import bus from "../utils/bus";

export default function useFlashMessage() {
  function setFlashMessage(msg, type) {
    //console.log(`Setando flash message: ${msg} (${type})`);  // eslint-disable-line no-console
    bus.emit("flash", { msg, type });
    
  }

  return { setFlashMessage };
}