import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
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
  // maxWidth: "1000px",
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
const FixedButton = styled(Button)({
  position: "fixed",
  bottom: "20px", // Adjust this value as per your preference
  left: "20px", // Adjust this value as per your preference
  backgroundColor: "orange", // Add your preferred background color here
  color: "white",
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
          `https://b004-105-157-74-204.ngrok-free.app/${dataToSend}/${query}`
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
              // <Grid item key={index} xs={type === "IA" ? 12 : 4}>
              <Grid item key={index} xs={4}>
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
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    field1: "",
    field2: "Jack",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [resultsQdrant, setResultsQdrant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState(null);
  const [otherResults, setOtherResults] = useState(null);
  // Functions to handle modal open/close
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitForm = async () => {
    setIsLoading(true); // Set loading state to true
    // Simulate API call or any asynchronous operation

    try {
      // Make API call with form data
      const obj = {
        question_id: resultsQdrant.question.id,
        reference: formData.field1,
        source: formData.field2,
      };

      console.log("API", obj);
      const response = await axios.post(
        "https://b004-105-157-74-204.ngrok-free.app/feedback",
        obj
      );
      console.log(response.data); // Log response or handle accordingly
      setIsLoading(false);
      // Close the modal after successful submission

      handleCloseModal();
      if (response.data) {
        window.alert("Your answer was sent to the database.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setResults(null);
    setOtherResults(null);
    setResultsQdrant(null);

    try {
      setLoading(true);
      // http://127.0.0.1:5000/ask
      // http://173.209.40.46:8070/ask
      // const response = await axios.post("http://127.0.0.1:5000/ask", {
      //   question: query,
      // });

      const responseQdrant = await axios.post(
        "https://b004-105-157-74-204.ngrok-free.app/chat",
        {
          messages: [{ role: "user", content: query }],
        }
      );

      const autresquestions = await axios.post(
        "https://b004-105-157-74-204.ngrok-free.app/generateQuestions",
        {
          query: query,
          // messages: [{ role: "user", content: query }],
        }
      );

      setResultsQdrant(responseQdrant.data);
      // setResults(response.data);
      setOtherResults(autresquestions.data);
      console.log("similar question:", autresquestions);
      console.log("chat response:", responseQdrant);
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
                <SuggestionLink onClick={() => setQuery(suggestion)}>
                  <Typography>{suggestion}</Typography>
                </SuggestionLink>
              </SuggestionItem>
            ))}
            {otherResults.slice(3, 6).map((suggestion, index) => (
              <SuggestionItem key={index}>
                <SuggestionLink onClick={() => setQuery(suggestion)}>
                  <Typography>{suggestion}</Typography>
                </SuggestionLink>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        </>
      )}

      {results || resultsQdrant ? <LineDivider /> : null}

      {results || resultsQdrant ? (
        <>
          <FixedButton variant="contained" onClick={handleOpenModal}>
            Aucune bonne reponse trouvé
          </FixedButton>
          <Grid container>
            {/* {results && (
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
          )} */}

            {/* {resultsQdrant && (
            <Grid item> */}
            <ResultContainer>
              <Typography variant="h5" gutterBottom>
                Réponses générées avec COSINE Similarity
              </Typography>

              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>
                  Assigné la reference de l'article de la bonne réponse
                </DialogTitle>
                <DialogContent>
                  {/* Form fields */}
                  <TextField
                    name="field1"
                    label="Réference"
                    value={formData.field1}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="field2"
                    label="Auteur"
                    value={formData.field2}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      disabled={isLoading} // Disable button when loading
                      onClick={handleSubmitForm}
                    >
                      Envoyer
                    </Button>
                  )}
                </DialogContent>
              </Dialog>
              <SearchResult
                type={"Qdrant"}
                result={resultsQdrant.result_qdrant}
                onShowPopup={handleShowPopup}
              />
            </ResultContainer>
            {/* </Grid>
          )} */}
          </Grid>
        </>
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
