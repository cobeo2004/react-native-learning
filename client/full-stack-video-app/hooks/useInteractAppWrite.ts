import React from "react";

type InteractorFunction<T> = () => T;
type InteractorResult<T> = [T, boolean, VoidFunction];

export const useInteractAppWrite = <T>(fn: InteractorFunction<T>): InteractorResult<T> => {
    const [data, setData] = React.useState<T | []>([]);
    const [fetching, setFetching] = React.useState<boolean>(true);

    const fetchData = async () => {
        setFetching(true);
        try {
            const posts = await fn();
            setData(posts as T);
        } catch (error) {
            throw new Error((error as { message: string }).message);
        } finally {
            setFetching(false);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);

    const refetchable = () => fetchData();

    return [data as T, fetching, refetchable] satisfies InteractorResult<T>;
}
