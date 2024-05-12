import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
   
  export function Startup(props) {
    return (
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src={props.imgLink}
            alt="ui/ux review check"
            className="object-cover h-[200px] w-full"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h3" color="blue-gray">
            {props.company}
          </Typography>
          <Typography variant="h6" color="blue-gray">
            {props.founder}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal text-sm">
            {props.description}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal text-sm rounded-lg bg-black/10 w-fit animate-pulse text-black p-2">
            {props.hookLine}
          </Typography>
          <Typography className="font-normal">Money Invested : {" "} <span>{props.money}</span></Typography>
        </CardBody>
      </Card>
    );
  }