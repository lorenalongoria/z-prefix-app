import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation can be added here if desired */}
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/items/new" element={<CreateItem />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/items/:id/edit" element={<EditItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
