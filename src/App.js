import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import Popup from "./components/Popup";
import logo from "./media/logo.png";

const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f8f8f8",
  minHeight: "100vh",
});

const LogoContainer = styled("div")({
  marginBottom: "8px",
});

const LogoImage = styled("img")({
  maxWidth: "150px", // Set the maximum width to 150px or adjust as needed
  height: "auto",
});

const SearchContainer = styled("div")({
  width: "100%",
  maxWidth: "600px",
  marginBottom: "16px",
});

const SearchBar = styled("div")({
  display: "flex",
  alignItems: "center",
});

const SearchInput = styled(TextField)({
  flex: 1,
  marginRight: "8px",
});

const SearchButton = styled(Button)({
  fontSize: "1rem",
  backgroundColor: (theme) => theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: (theme) => theme.palette.primary.dark,
  },
});

const ResultContainer = styled("div")({
  width: "100%",
  maxWidth: "1000px",
});

const ResponseItem = styled("div")({
  marginBottom: "24px",
});

const GoodAnswerButton = styled(Button)({
  marginTop: "8px",
});

const InitialMessage = styled("div")({
  marginTop: "16px", // Add margin top to the div
});
const TruncatedTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; // Adjust the number of lines to your preference
  -webkit-box-orient: vertical;
`;

const LineDivider = styled(Divider)({
  width: "100%",
  marginTop: "16px",
  marginBottom: "16px",
});

function SearchResult({ result, onShowPopup }) {
  const [clickedResponses, setClickedResponses] = useState([]);

  const handleGoodAnswer = async (title, query) => {
    if (!clickedResponses.includes(title)) {
      setClickedResponses([...clickedResponses, title]);

      const dataToSend = {
        answer: "2(3)a)A)",
        texte: "answer simple no need to worrry",
        collection: "question_answer.answer",
      };

      axios
        .post(
          `https://00c5-105-67-135-75.ngrok-free.app/${dataToSend}/${query}`
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const sortedResults = result.result_qdrant?.sort((a, b) => b.Score - a.Score);

  return (
    <ResultContainer>
      <Grid container spacing={2}>
        {sortedResults?.map((res, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {res.titre}
                </Typography>
                <TruncatedTypography>{res.Paragraphe}</TruncatedTypography>
                <Typography>
                  <b>Référence:</b> {res.La_loi}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  onClick={() => onShowPopup(res.hyperlink)}
                  size="small"
                >
                  Show Details
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleGoodAnswer(res.La_loi)}
                  disabled={clickedResponses.includes(res.La_loi)}
                >
                  Good Answer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ResultContainer>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState(null);

  const handleSearch = async () => {
    setResults(null);
    try {
      setLoading(true);

      const response = await axios.post(
        "https://aymanemalih-qdrant-flask.hf.space/chat",
        {
          messages: [{ role: "user", content: query }],
        }
      );
      console.log("response: ", response);

      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPopup = (resultId) => {
    setSelectedResultId(resultId);
  };

  const handleClosePopup = () => {
    setSelectedResultId(null);
  };

  return (
    <StyledDiv>
      <LogoContainer>
        <LogoImage src={logo} alt="Your Logo" />
      </LogoContainer>

      <SearchContainer>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Recherchez ici..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchButton
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      "Chercher"
                    )}
                  </SearchButton>
                </InputAdornment>
              ),
            }}
          />
        </SearchBar>
      </SearchContainer>

      {results && <LineDivider />}

      {results && (
        <SearchResult result={results} onShowPopup={handleShowPopup} />
      )}

      {!results && !loading && (
        <InitialMessage>
          <Typography variant="body1">
            Entrez votre requête pour commencer la recherche.
          </Typography>
        </InitialMessage>
      )}

      {selectedResultId && (
        <Popup selectedResultId={selectedResultId} onClose={handleClosePopup} />
      )}
    </StyledDiv>
  );
}

export default App;
