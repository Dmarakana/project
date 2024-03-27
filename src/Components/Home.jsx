import Slideshow from "./Slide";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Other from "./Other";
import SearchResults from "./SearchResults";
import { useState } from "react";

export default function Home() {
  const [search, setsearch] = useState("");
  const handleInputChange = (value) => {
    setsearch(value);
  };

  return (
    <>
      <Navbar handleInputChange={handleInputChange} />

      {search === "" || search === null ? (
        <>
          <Slideshow />
          <Other />
        </>
      ) : (
        <SearchResults data={search} />
      )}

      <Footer />
    </>
  );
}
