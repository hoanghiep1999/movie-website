import './Loading.css';

export default function Loading () {
    return (
        <div className="loading">
            <svg className="loading-svg" viewBox="0 0 100 100">
                <path
                ng-attr-d="{{config.pathCmd}}"
                ng-attr-fill="{{config.color}}"
                stroke="none"
                d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                fill="#000"
                transform="rotate(179.719 50 51)">
                    <animateTransform
                    attributeName="transform"
                    type="rotate"
                    calcMode="linear"
                    values="0 50 51;360 50 51"
                    keyTimes="0;1"
                    dur="1s"
                    begin="0s"
                    repeatCount="indefinite">
                    </animateTransform>
                </path>
            </svg>
            <span className="loading-text">Loading...</span>
        </div>
    );
}