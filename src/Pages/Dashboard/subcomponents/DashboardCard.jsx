const DashboardCard = ({title, value, icon}) => {
    return (
        <div className="dashboard-card">
            <div className="text-body">
                <div className="header">
                   {title}
                </div>
                <div className="body">
                    {value}
                </div>
            </div>
            <div className="icon">
                <span className="iconify" data-icon={icon} data-inline="false"></span>
            </div>        
        </div>
    )
}

export default DashboardCard
