import { Tab } from "@headlessui/react";
import Login from "./Login";
import SignUp from "./SignUp";
const Auth = () => {
  return (
    <div className="flex-grow h-full mt-20 bg-gray-50 flex px-6 md:px-12 py-6">
      <div className="w-full max-w-[40rem] bg-white shadow-md rounded-lg m-auto overflow-hidden">
        <div className="w-full">
          <Tab.Group>
            <Tab.List className="flex items-center">
              <Tab
                className={({ selected }) =>
                  `w-full border-b-2 ${
                    selected ? "border-red-600 bg-primary" : ""
                  } py-3`
                }
              >
                Login
              </Tab>
              <Tab
                className={({ selected }) =>
                  `w-full border-b-2 ${
                    selected ? "border-red-600 bg-primary" : ""
                  } py-3`
                }
              >
                Register
              </Tab>
            </Tab.List>
            <Tab.Panel>
              <Login />
            </Tab.Panel>
            <Tab.Panel>
              <SignUp />
            </Tab.Panel>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Auth;
