
import "./SignUp.scss";

export default function SignUp() {

  return (
    <>
      <section>

        <div className="Slogan d-flex flex-column align-items-center">
          <h1 className="Signup_Slogan">WORK</h1>
          <br></br>
          <h1 className="Signup_Slogan">SWEAT</h1>
          <br></br>
          <h1 className="Signup_Slogan">ACHIEVE</h1>
          <br></br>
        </div>
        <div className=" d-flex SignUp_shadow Slogan_pic">
          <img src="/cover2.jpeg" alt="" className="SignUpTopImg" />
        </div>

      </section>


    </>
  );
}
