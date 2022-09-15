import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <circle cx="130" cy="130" r="130" />
        <rect x="5" y="281" rx="10" ry="10" width="260" height="25" />
        <rect x="11" y="322" rx="10" ry="10" width="250" height="82" />
        <rect x="11" y="419" rx="5" ry="5" width="110" height="25" />
        <rect x="152" y="417" rx="15" ry="15" width="110" height="35" />
    </ContentLoader>
);

export default Skeleton;
