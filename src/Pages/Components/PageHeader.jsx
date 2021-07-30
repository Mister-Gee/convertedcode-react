import PageCarousel from './PageCarousel';
import { Parallax } from 'react-scroll-parallax';

const PageHeader = ({title, titleStyle}) => {
    const splitTitle = title.split(" ");
    return (
        <div className={`match-review-header ${titleStyle}`}>
            <Parallax
                tagOuter="figure"
                y={[0, 0]}
                x={[-10, 20]}
            >
            <div className="match-review-carousel">
                <PageCarousel 
                    deviceType="desktop" 
                />
            </div>
            </Parallax>
            <div className="title">
                <div>{splitTitle[0]} </div>
                <span>{splitTitle[1]}</span>
                <span>{splitTitle[2]}</span>
            </div>
        </div>
    )
}

export default PageHeader
