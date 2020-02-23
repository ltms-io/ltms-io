const initState =  {
  name: "Test Test",
  email: "test@test.com",
  tournaments: [
    {id: "69", title: "Testfest 2020", role: "Tester"}
  ]
};

const rootReducer = (state = initState, action) => {
  return state;
};

export default rootReducer;
