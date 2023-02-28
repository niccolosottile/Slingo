import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PasswordResetCSS from "../css/emailauth.module.css";

export default function PasswordReset() {
    
    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const param = useParams();

    const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            }
        }
        verifyUrl();
    }, [param, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(url, { password });
            setMsg(data.message);
            setError(""); 
            console.log("ns1");
            window.location = "/login";
        } catch (error) {
            if (
                error.response && 
                error.response.status >= 400 &&
                error.response.status <= 500 
            ) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    };

    return (
        <div className={PasswordResetCSS.container}>
            <div className={PasswordResetCSS["container-1"]}>
                <div className={PasswordResetCSS["sub-container-1"]}>
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={PasswordResetCSS["slingo-logo"]}
                >
                    <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M99.7398 50C99.7398 77.2829 77.5487 99.4 50.1746 99.4C22.8005 99.4 0.609375 77.2829 0.609375 50C0.609375 22.7171 22.8005 0.600006 50.1746 0.600006C77.5487 0.600006 99.7398 22.7171 99.7398 50ZM31.0544 77.5045C31.4378 77.8881 31.8853 78.08 32.3966 78.08H60.5183C62.1375 78.08 63.5009 77.5152 64.6088 76.3854C65.7166 75.2557 66.2705 73.9021 66.2705 72.3246V58.9595C66.2705 58.1922 66.1214 57.4461 65.8232 56.7213C65.5248 55.9966 65.0775 55.3571 64.4809 54.8029L50.9314 41.8214C50.5905 41.5231 50.2816 41.3738 50.0047 41.3738C49.7277 41.3738 49.44 41.5017 49.1418 41.7575C48.5879 42.2265 48.247 42.8127 48.1192 43.5161C47.9914 44.2196 48.0979 44.9123 48.4387 45.5945L51.3148 51.2218H29.8401C29.3288 51.2218 28.8813 51.4031 28.4978 51.7654C28.1144 52.1277 27.9227 52.5861 27.9227 53.1403C27.9227 53.6518 28.1144 54.0995 28.4978 54.4832C28.8813 54.8669 29.3288 55.0587 29.8401 55.0587H44.5401V58.8956H26.0053C25.494 58.8956 25.0465 59.0768 24.6631 59.4391C24.2796 59.8015 24.0879 60.2598 24.0879 60.814C24.0879 61.3256 24.2796 61.7732 24.6631 62.157C25.0465 62.5406 25.494 62.7325 26.0053 62.7325H44.5401V66.5694H28.5618C28.0505 66.5694 27.6031 66.7505 27.2196 67.1129C26.8361 67.4753 26.6444 67.9335 26.6444 68.4878C26.6444 68.9993 26.8361 69.4471 27.2196 69.8307C27.6031 70.2144 28.0505 70.4062 28.5618 70.4062H44.5401V74.2431H32.3966C31.8853 74.2431 31.4378 74.4243 31.0544 74.7866C30.6709 75.1491 30.4792 75.6073 30.4792 76.1615C30.4792 76.6732 30.6709 77.1208 31.0544 77.5045ZM39.1075 29.6074L47.3522 38.3044C48.247 37.7928 49.0886 37.5369 49.8768 37.5369C50.6651 37.5369 51.5279 37.7501 52.4653 38.1764L41.9197 26.9855C41.5788 26.6019 41.142 26.3994 40.6094 26.3781C40.0768 26.3567 39.6188 26.5166 39.2353 26.8576C38.8519 27.2414 38.6494 27.6996 38.6281 28.2325C38.6068 28.7654 38.7666 29.2237 39.1075 29.6074ZM36.1674 37.6649L44.6679 46.5536C44.5401 46.0421 44.4442 45.5411 44.3803 45.0508C44.3163 44.5606 44.2844 44.0596 44.2844 43.548C44.2844 43.207 44.3376 42.834 44.4442 42.429C44.5507 42.0239 44.7105 41.6083 44.9235 41.1819L38.9796 35.043C38.6388 34.6593 38.202 34.4568 37.6694 34.4355C37.1368 34.4141 36.6788 34.574 36.2953 34.9151C35.9119 35.2988 35.7094 35.7571 35.6881 36.29C35.6668 36.8229 35.8266 37.2812 36.1674 37.6649ZM67.7406 52.7246C67.9962 53.0017 68.2305 53.2895 68.4435 53.5879L73.3648 49.1115C73.9613 48.5573 74.4194 47.9178 74.739 47.1931C75.0586 46.4684 75.2183 45.701 75.2183 44.891V26.1543C75.2183 25.6852 75.1437 25.3549 74.9946 25.163C74.8455 24.9711 74.5792 24.8539 74.1957 24.8113C73.4713 24.726 72.7896 24.8645 72.1505 25.227C71.5114 25.5893 71.0639 26.1329 70.8083 26.8576L68.6992 32.9327L53.9353 17.3293C53.5944 16.9457 53.1576 16.7432 52.625 16.7219C52.0924 16.7005 51.6345 16.8604 51.251 17.2015C50.8675 17.5852 50.6651 18.0435 50.6438 18.5764C50.6225 19.1093 50.7823 19.5675 51.1232 19.9513L61.2853 30.5667L58.4731 33.2525L45.7545 19.8234C45.4136 19.4397 44.9661 19.2372 44.4122 19.2159C43.8584 19.1946 43.3896 19.3544 43.0062 19.6954C42.6227 20.0792 42.431 20.5268 42.431 21.0384C42.431 21.55 42.6014 21.9976 42.9423 22.3812L55.6609 35.8743L54.3188 37.2173L52.9766 38.5601L66.9096 51.8613C67.2079 52.1598 67.4849 52.4475 67.7406 52.7246Z"
                    fill="white"
                    />
                </svg>
                <h1 className={PasswordResetCSS["slingo-header"]}>Slingo</h1>
                </div>
                <div className={PasswordResetCSS["slingo-slogan"]}>
                <div className={PasswordResetCSS["quote-part-1"]}>
                    <p>"Sign language is the noblest gift </p>
                    <p>God has given to deaf people."</p>
                </div>
                <p className={PasswordResetCSS["quote-author"]}>- George William Veditz</p>
                </div>
            </div>
            <div className={PasswordResetCSS["sub-container-2"]}>
                <Fragment>
                    {validUrl ? (
                        <div>
                            <h1 className={PasswordResetCSS["login-header"]}>Reset password</h1>
                            <form className={PasswordResetCSS["login-form"]} onSubmit={handleSubmit}>
                                <div>
                                    <label className={PasswordResetCSS["login-form-label"]} htmlFor="password">
                                    Password
                                    </label>
                                    <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value )}
                                    placeholder={"Enter a new password"}
                                    />
                                </div>
                                {error && <div>{error}</div>}
                                {msg && <div>{msg}</div>}
                                <button className={PasswordResetCSS["login-button"]} type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    ) : (
                        <h1>404 Not Found</h1>
                    )}
                </Fragment>
            </div>
        </div>
    );
};