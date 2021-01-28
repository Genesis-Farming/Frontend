import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import useWindowSize from "../hooks/useWindowSize";
import ColorGuide from "../styles/colorGuide";
import {useAuth} from "../hooks/useAuth";
import {useRouter} from "next/router";
import Loader from 'react-loader-spinner'

export default function Login() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  async function signIn() {
    setLoading(true);
    try {
      await auth.signin(mailAddress, password);
      await router.replace('/dashboard');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <Layout pageTitle="Connexion" style={{ paddingTop: 0 }}>
      <div style={{ height: "100vh" }} className="containerSpaceBetween">
        <div className="halfBloc containerCenter" style={{ height: "100%" }}>
          <div style={{ width: "60%", maxWidth: 540 }}>
            <h1 style={{ marginBottom: 40 }}>Connexion</h1>

            <label>
              <p>Adresse mail</p>
            </label>

            <input type="email" name="Adresse mail" value={mailAddress} onChange={e => setMailAddress(e.target.value)} />

            <label>
              <p>Mot de passe</p>
            </label>

            <input
              type="password"
              name="Mot de passe"
              style={{ marginBottom: 40 }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

              <button className="containerRow containerCenter" style={{ width: "100%", marginBottom: 60 }} onClick={() => signIn()}>
                <p>Connexion</p>
                <Loader style={{marginLeft: 10}} visible={loading} type="Oval" color={ColorGuide.mainWhite} height={24} width={24}/>
              </button>

            <p>Pas encore de compte? <Link href={"signup"}>Inscription</Link></p>
          </div>
        </div>

        <div
          className="halfBloc containerCenter"
          style={{ backgroundColor: ColorGuide.lightBlue, height: "100%" }}
        >
          <div style={{ width: "80%", maxWidth: 540 }}>
            <img className="imageFit" src="/art/exchange.png" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
