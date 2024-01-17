import { ProgressBar } from 'react-loader-spinner';


interface SpinnerProps {
    title?: string
    className?: string;
}

const Spinner = ({ title = "", className }: SpinnerProps) => {

    return (
        <div className={className ?? 'my-10 flex flex-col justify-center items-center '}>
            <p className='text-dark'>{title}</p>
            <ProgressBar
                // wrapperClass="my-10 mx-auto "
                height="100"
                width="100"
                ariaLabel="progress-bar-loading"
                borderColor={"rgb(0,0,0)"}
                barColor={"rgb(0,0,255)"}
            />
        </div>
    )
}

export default Spinner