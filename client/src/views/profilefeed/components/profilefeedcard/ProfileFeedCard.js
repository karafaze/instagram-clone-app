import React, {useState, useEffect} from "react";
import { getItemsFromLocalStorage } from "../../../../utils/localStorageToken";
import CardPicture from "./CardPicture";
import CardLike from "./CardLike";
import CardComment from "./CardComment";
import CardLikedBy from "./CardLikedBy";
import "./profilefeedcard.scss";

export default function ProfileFeedCard({ data }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (data.likes.length > 0){
            const { token } = getItemsFromLocalStorage();
            const urls = data.likes?.map((id) => {
                return fetch(`/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            });
            Promise.all(urls)
                .then(responses => Promise.all(responses.map((res) => res.json()))
                )
                .then(results => {
                    let updatedList = [];
                    results.forEach((user) => {
                        if (user.status === "OK") {
                            updatedList.push(user.data);
                        } else {
                            setUsers(null);
                            throw Error("Something went wrong");
                        }
                    })
                    setUsers(updatedList);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [data.likes])

    return (
        <div className="card">
            <div className="card--content">
                <CardPicture src={data.pictureUrl} />
            </div>
            <div className="card--bottom">
                <div className="card--bottom__cta">
                    <CardLike likes={data.likes} postId={data._id} />
                    <CardComment comments={data.comments} />
                </div>
                {data.likes.length > 0 ? (
                    <div className="card--bottom__likes">
                        <CardLikedBy likes={data.likes} users={users}/>
                    </div>
                ) : null}
                <div className="card--bottom__comments">
                    <div className="comment">
                        <h3 className="comment--author">markus</h3>
                        <p className="comment--content">
                            Waves coming! &#9975;
                        </p>
                        <span className="comment--timestamp">1 hour ago</span>
                    </div>
                    <p className="comment--load">View all comments</p>
                </div>
            </div>
        </div>
    );
}
