import { useEffect, useState } from "react";
import Profile from "../api/profileapi";
import Sidebar from "../sidebar/sidebar"
import {
    Files,
    Trophy,
    TrendingUp,
    TrendingDown
} from "lucide-react";
import "./profile.css"
const ProfileStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await Profile();
                setStats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <p>Loading dashboard stats...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const cards = [
        {
            title: "Total Resumes",
            value: stats?.totalresume ?? 0,
            icon: Files
        },
        {
            title: "Highest Score",
            value: `${Math.round(stats?.maximunscore ?? 0)}/100`,
            icon: Trophy
        },
        {
            title: "Average Score",
            value: `${Math.round(stats?.averagescore ?? 0)}/100`,
            icon: TrendingUp
        },
        {
            title: "Lowest Score",
            value: `${Math.round(stats?.minimumscore ?? 0)}/100`,
            icon: TrendingDown
        }
    ];
return (<>
    <div className="dashboard-layout">
    <Sidebar/>
    <section className="dashboard-stats">
        

        <div className="stats-header">
            <h2>Resume Analysis</h2>
            <p>
                Track your resume performance and see how well your
                resumes are scoring.
            </p>
        </div>

        {cards.map((card) => {
            const Icon = card.icon;

            return (
                <article className="stats-card" key={card.title}>
                    <div className="stats-card-icon">
                        <Icon size={22} />
                    </div>

                    <p>{card.title}</p>
                    <h2>{card.value}</h2>
                </article>
            );
        })}

    </section>
    </div>
    </>
);

};



export default ProfileStats;