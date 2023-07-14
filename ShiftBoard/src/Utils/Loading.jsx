import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = ({ count }) => {
  return <Skeleton count={count} />;
};

export default Loading;
