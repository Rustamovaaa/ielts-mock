import { redirect } from "next/navigation";

const RedirectPage = async () => {
  redirect("/sign-in");
};

export default RedirectPage;
