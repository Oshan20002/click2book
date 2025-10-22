import React from "react";

export default function SignUp() {
  return (
    <main>
      <h1 className="text-center mt-10 font-bold text-5xl ml-24" >Click2Book</h1>
      <h2 className="text-center mt-5 font-bold text-2xl ml-24">SignUp</h2>
      <div className="w-1/3 mx-auto mt-5">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-10">
          <label className="label text-xl">I want to join as a</label>

          <div className="flex gap-4 mb-4">
            <button className="btn btn-wide border-black">Coustomer</button>
            <button className="btn btn-wide border-black">Provider</button>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-full">
              <label className="label">First Name</label>
              <input type="text" className="input" placeholder="First Name" />
            </div>

            <div>
              <label className="label">Last Name</label>
              <input type="text" className="input" placeholder="Last Name" />
            </div>
          </div>

          <label className="label">Email Address</label>
          <input type="email" className="input w-full" placeholder="Enter Your Email" />

          <label className="label">Password</label>
          <input type="password" className="input w-full" placeholder="Create a Password" />

          <label className="label">Conform Password</label>
          <input type="password" className="input w-full" placeholder="Comform Your Password" />

          <br />
          <br />
          <div className="flex gap-4">
            <input type="checkbox" defaultChecked className="checkbox" />
            <p>I agree to the <b>Terms and Conditions </b> and <b>Privacy Policy</b></p>
          </div>
          <br />

          <button className="btn btn-neutral mt-4 w-full "><a href="Login">Create Account</a></button>

          <div className="divider">Or SignUp with</div>

          <div className="flex gap-24 w-full">
            {/* Google */}
            <button className="btn bg-white text-black border-[#e5e5e5] w-5/12">
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              Login with Google
            </button>

            {/* Facebook */}
            <button className="btn bg-[#1A77F2] text-white border-[#005fd8] w-5/12">
              <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
              Login with Facebook
            </button> 
            <br /> 
          </div>
          <br />
          <p className="text-center"><u>Already have an account?   <b><a href="Login">  Login here</a></b></u></p>
        </fieldset>
      </div>
    </main>
  );
}
