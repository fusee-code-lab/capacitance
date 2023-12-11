import { useElement } from "@youliso/granule";

let testInterval: number | undefined;
const [date, dateElement] = useElement(Date());
const timeViewRs = () => {
  date.value = Date();
  testInterval = setInterval(() => {
    date.value = Date();
  }, 1000);
};

export const onUnmounted = () => {
  if (testInterval) clearInterval(testInterval);
};

export const onLoad = () => {
  console.log("onLoad");
  timeViewRs();
};

export const render = async () => {
  return (
    <div>
      <div>{dateElement}</div>
    </div>
  );
};
