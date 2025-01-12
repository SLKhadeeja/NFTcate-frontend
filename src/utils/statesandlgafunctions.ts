import { statesAndLga } from "../contants/statesAndLga";

export const getAllStates = () => {
  const allStates = statesAndLga.map(state => {
    return (
      {label: state.state, value: state.state}
    )
  });
  return allStates;
}

export const getLgasByState = (stateName: string) => {
  const state = statesAndLga.find(state => state.state === stateName);
  const lgas = state?.lgas.map(lga => {
    return (
      {label: lga, value: lga}
    )
  })
  return lgas;
};