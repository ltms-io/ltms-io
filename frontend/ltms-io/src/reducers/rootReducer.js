const initState =  {
  tournaments: [
    {id: "1", title: "Purdue FLL 2020", role: "Tournament Director"},
    {id: "2", title: "Indiana FLL 2020", role: "Referee"},
    {id: "3", title: "National FLL 2020", role: "Volunteer"}
  ]
};

const rootReducer = (state = initState, action) => {
  return state;
};

export default rootReducer;
