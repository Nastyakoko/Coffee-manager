import DatePicker from '@mui/lab/DatePicker';
import {
	AppBar,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box } from '@mui/system';

const STATUSES = {
	PICKING: 'Picking',
	IN_TRANSIT: 'In Transit',
	DELIVERED: 'Delivered',
};

const COFFEE_TYPES = ['Arabica', 'Robusta', 'Black Coffee', 'Decaf'];

const INITIAL_ORDERS = [
	{
		coffeeType: COFFEE_TYPES[0],
		weight: 3235,
		amount: 2,
		deliveryDate: new Date(),
		postDate: new Date(),
		status: STATUSES.PICKING,
	},
	{
		coffeeType: COFFEE_TYPES[1],
		weight: 6433,
		amount: 43,
		deliveryDate: new Date(),
		postDate: new Date(),
		status: STATUSES.IN_TRANSIT,
	},
	{
		coffeeType: COFFEE_TYPES[3],
		weight: 11123,
		amount: 10,
		deliveryDate: new Date(),
		postDate: new Date(),
		status: STATUSES.DELIVERED,
	},
];

const INITIAL_FORM = {
	coffeeType: '',
	weight: 0,
	amount: 0,
	deliveryDate: null,
	postDate: null,
};

function App() {
	const [orders, setOrders] = useState(INITIAL_ORDERS);

	const [formData, setFormData] = useState(INITIAL_FORM);

	const setFormField = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const getRandomStatus = () => {
		const keys = Object.keys(STATUSES);

		return STATUSES[keys[Math.floor(Math.random() * keys.length)]];
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		const newOrder = { ...formData, status: getRandomStatus() };

		setOrders((prev) => [...prev, newOrder]);

		setFormData(INITIAL_FORM);
	};

	const formatDate = (date) => {
		const day = date.toLocaleDateString('en-AU', {
			day: 'numeric',
		});
		const month = date.toLocaleDateString('en-AU', {
			month: 'long',
		});
		const year = date.toLocaleDateString('en-AU', {
			year: 'numeric',
		});

		return `${day}th ${month} ${year}`;
	};

	return (
		<div className="App">
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<AppBar position="static">
					<Toolbar>
						<Container maxWidth="md">
							<Typography variant="h6" color="inherit" component="div">
								Coffee Manager
							</Typography>
						</Container>
					</Toolbar>
				</AppBar>
				<Container maxWidth="md" style={{ paddingTop: '30px' }}>
					<Grid
						container
						spacing={2}
						direction="column"
						alignItems="stretch"
						justifyContent="center"
					>
						<Grid item xs={3}>
							<Paper style={{ padding: '30px' }} elevation={2}>
								<Typography variant="h5" gutterBottom>
									New order
								</Typography>
								<Stack gap="30px" component="form" onSubmit={onFormSubmit}>
									<Grid
										display="grid"
										gap="30px"
										gridTemplateColumns="2fr 1fr 1fr"
									>
										<FormControl>
											<InputLabel id="coffeeType">Coffee type</InputLabel>
											<Select
												labelId="coffeeType"
												id="coffeeType"
												value={formData.coffeeType}
												label="Coffee Type"
												onChange={({ target: { value } }) =>
													setFormField('coffeeType', value)
												}
												required
											>
												{COFFEE_TYPES.map((type) => (
													<MenuItem key={type} value={type}>
														{type}
													</MenuItem>
												))}
											</Select>
										</FormControl>

										<TextField
											id="weight"
											label="Weight (grams)"
											variant="outlined"
											type="number"
											value={formData.weight}
											onChange={({ target: { value } }) =>
												setFormField('weight', value)
											}
											required
										/>
										<TextField
											id="amount"
											label="Amount"
											variant="outlined"
											type="number"
											value={formData.amount}
											onChange={({ target: { value } }) =>
												setFormField('amount', value)
											}
											required
										/>
									</Grid>
									<Grid
										display="grid"
										gap="30px"
										gridTemplateColumns="0.925fr 1fr"
									>
										<DatePicker
											label="Delivery date"
											value={formData.deliveryDate}
											onChange={(newValue) => {
												setFormField('deliveryDate', newValue);
											}}
											renderInput={(params) => (
												<TextField required {...params} />
											)}
										/>
										<DatePicker
											label="Post date"
											value={formData.postDate}
											onChange={(newValue) => {
												setFormField('postDate', newValue);
											}}
											renderInput={(params) => (
												<TextField required {...params} />
											)}
										/>
									</Grid>
									<Box sx={{ maxWidth: '300px', margin: 'auto' }}>
										<Button variant="contained" type="submit">
											Create
										</Button>
									</Box>
								</Stack>
							</Paper>
						</Grid>
						<Grid item xs={3}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Coffee Type</TableCell>
											<TableCell align="right">Weight&nbsp;(g)</TableCell>
											<TableCell align="right">Amount&nbsp;(pcs)</TableCell>
											<TableCell align="right">Delivery Date</TableCell>
											<TableCell align="right">Post Date</TableCell>
											<TableCell align="right">Status</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{orders.map((row, i) => (
											<TableRow
												key={row.coffeeType + '' + i}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
												}}
											>
												<TableCell component="th" scope="row">
													{row.coffeeType}
												</TableCell>
												<TableCell align="right">{row.weight}</TableCell>
												<TableCell align="right">{row.amount}</TableCell>
												<TableCell align="right">
													{formatDate(row.deliveryDate)}
												</TableCell>
												<TableCell align="right">
													{formatDate(row.postDate)}
												</TableCell>
												<TableCell align="right">{row.status}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</Container>
			</LocalizationProvider>
		</div>
	);
}

export default App;
