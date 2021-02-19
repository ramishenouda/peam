import Skeleton from 'react-loading-skeleton';

export const Loader = () => {
    return (
        <>
        <div style={{ fontSize: 20, lineHeight: 2 }}>
            <h1><Skeleton /></h1>
            <Skeleton count={2} />
        </div>
        </>
    )
}
