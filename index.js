import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Juuksur AI (demo)</h1>
      <p>Küsi abi lõikustehnikate kohta või lae üles juuksepilt:</p>

      <textarea
        placeholder="Kirjelda olukorda..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", height: "100px", marginTop: "1rem" }}
      />

      <input type="file" accept="image/*" onChange={handleUpload} style={{ marginTop: "1rem" }} />

      {image && <img src={image} alt="preview" style={{ marginTop: "1rem", maxWidth: "300px" }} />}

      <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
        ⚠️ See on ainult demo. Andmeid ei saadeta veel AI-le.
      </p>
    </div>
  );
}