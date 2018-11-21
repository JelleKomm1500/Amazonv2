using System;
using System.Collections.Generic;
using System.Linq;
using Controllers;

namespace Models {
    public class World : IObservable<Command>, IUpdatable
    {
        private List<Object> worldObjects = new List<Object>();
        private List<IObserver<Command>> observers = new List<IObserver<Command>>();
        
        public World() {
            Robot r = CreateRobot(0, 0, 0);
            r.Move(4.6, 3.8, 13);

            Barrels ba = CreateBarrels(0, 0, 0);
            ba.Move(10, 5, 20);

            Boat b = CreateBoat(0.0,0.10,-62.0);
            //b.Move(10, 20, 30);

            LightHouse l = CreateLightHouse(12, 3.5, 74.0);
            //l.Move(0, 50, 50);
        }

        private Robot CreateRobot(double x, double y, double z) {
            Robot r = new Robot(x,y,z,0,0,0);
            worldObjects.Add(r);
            return r;
        }

        private Barrels CreateBarrels(double x, double y, double z)
        {
            Barrels ba = new Barrels(x, y, z, 0, 0, 0);
            worldObjects.Add(ba);
            return ba;
        }

        private Boat CreateBoat(double x, double y, double z)
        {
            Boat b = new Boat(x, y, z, 0, 0, 0);
            worldObjects.Add(b);
            return b;
        }

        private LightHouse CreateLightHouse(double x, double y, double z)
        {
            LightHouse l = new LightHouse(x, y, z, 0, 0, 0);
            worldObjects.Add(l);
            return l;
        }

        public IDisposable Subscribe(IObserver<Command> observer)
        {
            if (!observers.Contains(observer)) {
                observers.Add(observer);

                SendCreationCommandsToObserver(observer);
            }
            return new Unsubscriber<Command>(observers, observer);
        }

        private void SendCommandToObservers(Command c) {
            for(int i = 0; i < this.observers.Count; i++) {
                this.observers[i].OnNext(c);
            }
        }

        private void SendCreationCommandsToObserver(IObserver<Command> obs) {
            foreach(Object m3d in worldObjects) {
                obs.OnNext(new UpdateModel3DCommand(m3d));
            }
        }

        public bool Update(int tick)
        {
            for(int i = 0; i < worldObjects.Count; i++) {
                Object u = worldObjects[i];

                if(u is IUpdatable) {
                    bool needsCommand = ((IUpdatable)u).Update(tick);

                    if(needsCommand) {
                        SendCommandToObservers(new UpdateModel3DCommand(u));
                    }
                }
            }

            return true;
        }
    }

    internal class Unsubscriber<Command> : IDisposable
    {
        private List<IObserver<Command>> _observers;
        private IObserver<Command> _observer;

        internal Unsubscriber(List<IObserver<Command>> observers, IObserver<Command> observer)
        {
            this._observers = observers;
            this._observer = observer;
        }

        public void Dispose() 
        {
            if (_observers.Contains(_observer))
                _observers.Remove(_observer);
        }
    }
}