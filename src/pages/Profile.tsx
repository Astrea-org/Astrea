import React from "react";

function Profile() {
  return (
    <>
      <div className="bg-white">
        <div className="max-w-screen-xl px-4 py-8 mx-auto mt-24">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Cat_-1_%2826079853855%29.jpg/1200px-Cat_-1_%2826079853855%29.jpg"
                className="aspect-square w-28 object-cover rounded-full"
              />
              <div className="mt-6">
                <p className="text-lg font-bold">Cat Chandak</p>
                <p>@catxar</p>
                <p>0xwierh4739nfcksdkngf234en34s</p>
              </div>
            </div>
            <div>
              <button className="mt-8 bg-gray-300 px-5 py-2 rounded-lg">
                Edit profile
              </button>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-lg font-bold">About</p>
            <p className="mt-2">
              I am a full stack developer currently working as LFX mentee with
              vitessio. I love building products.
            </p>
          </div>
          <div className="mt-12">
            <p className="text-lg font-bold">My Assets</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
