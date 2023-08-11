interface ITempMessage {
  message: string;
}

// payload/temperature
// export const onTempMessage = ({ message }: ITempMessage) => {
//   try {
//     const { value, time } = JSON.parse(message);
//     temperatureStore.update({ value, time });
//   } catch (error) {
//     console.log(error);
//   }
// };
