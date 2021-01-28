import React, { useState, useEffect } from "react";

import Link from "next/link";

import Layout from "../components/layout";

import useWindowSize from "../hooks/useWindowSize";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";
import {useAuth} from "../hooks/useAuth";
import * as firebase from "firebase";
import {useRouter} from "next/router";

export default function Signup() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const auth = useAuth();
  const router = useRouter()

  async function signup() {
    try {
      const user = await auth.signup(mailAddress, password);
      console.log(user);
      await firebase.firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        mailAddress,
        phoneNumber,
        id: user.uid,
      });
      await router.replace('dashboard');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Layout pageTitle="Inscription" style={{ paddingTop: 0 }}>
      <div style={{ height: "100vh" }} className="containerSpaceBetween">
        {step === 1 && (
          <div className="halfBloc containerCenter" style={{ height: "100%" }}>
            <div style={{ width: "60%", maxWidth: 540 }}>
              <h1 style={{ marginBottom: 40 }}>Inscription</h1>

              <label>
                <p>Prénom</p>
              </label>

              <input type="text" key="firstName" name="Prénom" value={firstName} onChange={e => setFirstName(e.target.value)} />

              <label>
                <p>Nom</p>
              </label>

              <input
                type="text"
                key="lastName"
                name="Nom"
                style={{ marginBottom: 40 }}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />

              <button style={{ width: "100%", marginBottom: 60 }} onClick={() => setStep(2)}>
                <p>Suivant</p>
              </button>

              <p>Déjà un compte? <Link href={"login"}>Connexion</Link></p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="halfBloc containerCenter" style={{ height: "100%" }}>
            <div style={{ width: "60%", maxWidth: 540 }}>
              <h1 style={{ marginBottom: 40 }}>Inscription</h1>

              <label>
                <p>Adresse mail</p>
              </label>

              <input type="email" key="mailAddress" name="Adresse mail" value={mailAddress} onChange={e => setMailAddress(e.target.value)} />

              <label>
                <p>Numéro de téléphone</p>
              </label>

              <input
                type="text"
                key="phoneNumber"
                name="Numéro de téléphone"
                style={{ marginBottom: 40 }}
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />

              <button style={{ width: "100%", marginBottom: 60 }} onClick={() => setStep(3)}>
                <p>Suivant</p>
              </button>

              <a onClick={() => setStep(1)} className="containerRow">
                <div className="defaultIconContainerSize containerRow">
                  <img src="/ui/arrow-left.png" className="defaultIconSize" />
                </div>
                <p style={{color: ColorGuide.mainBlue}}>Retour</p>
              </a>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="halfBloc containerCenter" style={{ height: "100%" }}>
            <div style={{ width: "60%", maxWidth: 540 }}>
              <h1 style={{ marginBottom: 40 }}>Inscription</h1>

              <label>
                <p>Mot de passe</p>
              </label>

              <input type="password" key="password" name="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />

              <label>
                <p>Confirmez le mot de passe</p>
              </label>

              <input
                type="password"
                key="passwordConfirm"
                name="Confirmez le mot de passe"
                style={{ marginBottom: 40 }}
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
              />

              <button style={{ width: "100%", marginBottom: 60 }} onClick={() => signup()}>
                <p>Suivant</p>
              </button>

              <a onClick={() => setStep(2)} className="containerRow">
                <div className="defaultIconContainerSize containerRow">
                  <img src="/ui/arrow-left.png" className="defaultIconSize" />
                </div>
                <p style={{color: ColorGuide.mainBlue}}>Retour</p>
              </a>
            </div>
          </div>
        )}
        <div
          className="halfBloc containerCenter"
          style={{ backgroundColor: ColorGuide.lightBlue, height: "100%" }}
        >
          <div style={{ width: "80%", maxWidth: 540 }}>
            <img className="imageFit" src="/art/assetExchange.png" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
