import PageCarousel from './PageCarousel';

const PageHeader = ({title, titleStyle}) => {
    const splitTitle = title.split(" ");
    return (
        <div className={`match-review-header ${titleStyle}`}>
            <div className="match-review-carousel">
                <PageCarousel 
                    deviceType="desktop" 
                />
            </div>
            <div className="title">
                <div>{splitTitle[0]} </div>
                <span>{splitTitle[1]}</span>
                <span>{splitTitle[2]}</span>
            </div>
        </div>
    )
}

export default PageHeader
