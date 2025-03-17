"use client"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar({ percentaje }: { percentaje: number }) {
    return (
        <div className='flex justify-center p-4'>
            <CircularProgressbar
                value={percentaje}
                text={`${percentaje}% gastado`}
                styles={buildStyles({
                    textSize: '8px',
                    pathColor: percentaje >= 100 ? '#FF0000' : '#6B46C1',
                    textColor: '#6B46C1',
                    trailColor: '#D1D5DB',
                })}
            />
        </div>
    )
}
