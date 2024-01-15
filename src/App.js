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
  maxWidth: "150px",
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
  marginTop: "16px",
});

const TruncatedTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
`;

const DualResultContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
  "& > div": {
    flex: 1,
    margin: "8px",
  },
});

const LineDivider = styled(Divider)({
  width: "100%",
  marginTop: "16px",
  marginBottom: "16px",
});

const SuggestionsList = styled("ul")({
  listStyle: "none",
  padding: 0,
  marginTop: "16px",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

const SuggestionItem = styled("li")({
  width: "48%",
  marginBottom: "8px",
});

const SuggestionLink = styled("a")({
  textDecoration: "none",
  color: "#1976D2",
  cursor: "pointer",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
    color: "#004080",
  },
});

function SearchResult({ type, result, onShowPopup }) {
  const [clickedResponses, setClickedResponses] = useState([]);

  const handleGoodAnswer = async (title, query) => {
    if (!clickedResponses.includes(title)) {
      setClickedResponses([...clickedResponses, title]);

      const dataToSend = {
        answer: "2(3)a)A)",
        texte: "answer simple no need to worry",
        collection: "question_answer.answer",
      };

      try {
        const response = await axios.post(
          `https://00c5-105-67-135-75.ngrok-free.app/${dataToSend}/${query}`
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ResultContainer>
      <Grid container spacing={2}>
        {result?.map(
          (res, index) =>
            res.titre && (
              <Grid item key={index} xs={type === "IA" ? 12 : 4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {res.titre}
                    </Typography>
                    <TruncatedTypography>
                      {res.GPT_Response ? res.GPT_Response : res.Paragraphe}
                    </TruncatedTypography>
                    <Typography>
                      <b>Référence:</b>{" "}
                      {res.reference ? res.reference : res.La_loi}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      marginTop: "auto", // Push buttons to the bottom
                      display: "flex",
                      justifyContent: "space-between", // Align buttons at the ends
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() =>
                        onShowPopup({
                          id: res.hyperlink,
                          section: res.section_label,
                          sectiontext: res.section_text,
                        })
                      }
                      size="small"
                    >
                      Afficher les détails
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleGoodAnswer(res.La_loi)}
                      disabled={clickedResponses.includes(res.La_loi)}
                    >
                      Bonne réponse
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
        )}
      </Grid>
    </ResultContainer>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [resultsQdrant, setResultsQdrant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [otherResults, setOtherResults] = useState(null);

  const handleSearch = async () => {
    setResults(null);
    setOtherResults(null);
    setResultsQdrant(null);

    try {
      setLoading(true);

      const response = await axios.post("http://173.209.40.46:8070/ask", {
        question: query,
      });

      const responseQdrant = await axios.post(
        "https://aymanemalih-qdrant-flask.hf.space/chat",
        {
          messages: [{ role: "user", content: query }],
        }
      );

      const autresquestions = await axios.post(
        "https://aymanemalih-qdrant-flask.hf.space/generateQuestions",
        {
          messages: [{ role: "user", content: query }],
        }
      );

      setResultsQdrant(responseQdrant.data);
      setResults(response.data);
      setOtherResults(autresquestions.data);
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

      {otherResults && otherResults.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Questions similaires
          </Typography>
          <SuggestionsList>
            {otherResults.slice(0, 3).map((suggestion, index) => (
              <SuggestionItem key={index}>
                <SuggestionLink onClick={() => setQuery(suggestion.slice(3))}>
                  <Typography>{suggestion.slice(3)}</Typography>
                </SuggestionLink>
              </SuggestionItem>
            ))}
            {otherResults.slice(3, 6).map((suggestion, index) => (
              <SuggestionItem key={index}>
                <SuggestionLink onClick={() => setQuery(suggestion.slice(3))}>
                  <Typography>{suggestion.slice(3)}</Typography>
                </SuggestionLink>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        </>
      )}

      {results || resultsQdrant ? <LineDivider /> : null}

      {results || resultsQdrant ? (
        <Grid container spacing={2}>
          {results && (
            <Grid item xs={4}>
              <ResultContainer>
                <Typography variant="h5" gutterBottom>
                  Réponses générées avec l'IA
                </Typography>
                <SearchResult
                  type={"IA"}
                  result={results}
                  onShowPopup={handleShowPopup}
                />
              </ResultContainer>
            </Grid>
          )}

          {resultsQdrant && (
            <Grid item xs={8}>
              <ResultContainer>
                <Typography variant="h5" gutterBottom>
                  Réponses générées avec COSINE Similarity
                </Typography>
                <SearchResult
                  type={"Qdrant"}
                  result={resultsQdrant.result_qdrant}
                  onShowPopup={handleShowPopup}
                />
              </ResultContainer>
            </Grid>
          )}
        </Grid>
      ) : null}

      {!results && !loading && (
        <InitialMessage>
          <Typography variant="body1">
            Entrez votre requête pour commencer la recherche.
          </Typography>
        </InitialMessage>
      )}

      {selectedResultId && (
        <Popup selectedResult={selectedResultId} onClose={handleClosePopup} />
      )}
    </StyledDiv>
  );
}

export default App;
