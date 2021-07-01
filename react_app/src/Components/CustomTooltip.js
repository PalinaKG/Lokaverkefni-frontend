// recharts doesn't export the default tooltip,
// but it's located in the package lib so you can get to it anyways
import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent";

const CustomTooltipContent = (props) => {
  var val1, val2, val3, val4, val5;
  var name1, name2, name3, name4, name5;

  // payload[0] doesn't exist when tooltip isn't visible
  if (props.payload[0] != null) {
    name1 = props.payload[0].name;
    val1 = props.payload[0].payload.A;

    if (props.payload[1] != null) {
      name2 = props.payload[1].name;
      val2 = props.payload[1].payload.B;
    }
    if (props.payload[2] != null) {
      name3 = props.payload[2].name;
      val3 = props.payload[2].payload.C;
    }

    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    const newPayload = [
      {
        name: name1,
        value: val1,
      },
      {
        name: name2,
        value: val2,
      },
      {
        name: name3,
        value: val3,
      },
    ];

    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }

  //   // we just render the default
  return <DefaultTooltipContent {...props} />;
};

export default CustomTooltipContent;
