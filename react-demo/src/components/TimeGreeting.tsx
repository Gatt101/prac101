interface TimeGreetingProps {
  timeOfDay: string;
}

function TimeGreeting({ timeOfDay }: TimeGreetingProps) {
  return <h2 className="text-3xl text-white">Good {timeOfDay}, React learner!</h2>;
}

export default TimeGreeting;
