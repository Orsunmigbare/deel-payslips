import { Loader } from "../Loader/Loader";

type ConditionalProps = {
    loading: boolean;
    data: any;
    children: React.ReactElement;
};

export const Conditional = ({ loading, data, children }: ConditionalProps) => {
    if (loading) {
        return <Loader />;
    } else if (data) {
        return children;
    } else {
        return <></>;
    }
};
